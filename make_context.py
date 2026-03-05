#!/usr/bin/env python3
"""
make_context.py

Genera un “paquete de contexto” del proyecto para entregárselo a un LLM.

Salidas:
- project_tree.txt: árbol estilo tree con archivos incluidos (ya filtrados)
- project_context.md: reglas + árbol + contenido de cada archivo incluido

Ejecución:
  python make_context.py

Opcional (parámetros por CLI):
  python make_context.py --max-depth 6 --max-file-size-kb 150 --ext .ts .tsx .md
"""

from __future__ import annotations

import argparse
import fnmatch
import os
from dataclasses import dataclass
from datetime import datetime
from typing import Dict, List, Optional, Sequence, Set, Tuple


# -----------------------------
# Config por defecto
# -----------------------------

DEFAULT_IGNORE_DIRS = {
    "node_modules",
    "dist",
    "build",
    ".next",
    ".turbo",
    ".git",
    "coverage",
    ".cache",
    "out",
    "target",
    "vendor",
    "__pycache__",
}

# Patrones de archivo a ignorar (por nombre) + extensiones/binaries comunes
DEFAULT_IGNORE_FILE_PATTERNS = [
    "*.log",
    "*.lock",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
]

DEFAULT_IGNORE_BINARY_EXTS = [
    "*.png",
    "*.jpg",
    "*.jpeg",
    "*.gif",
    "*.pdf",
    "*.zip",
    "*.tar",
    "*.gz",
    "*.exe",
    "*.dll",
    "*.so",
    "*.bin",
]

# Extensiones “permitidas” por defecto.
# Nota: ".env.example" NO es una extensión real (es un sufijo compuesto),
# así que lo tratamos como "allowed suffix" (termina en .env.example).
DEFAULT_ALLOWED_EXTS = [
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".json",
    ".md",
    ".yml",
    ".yaml",
    ".prisma",
    ".sql",
]

DEFAULT_ALLOWED_SUFFIXES = [
    ".env.example",
]


# -----------------------------
# Helpers
# -----------------------------

@dataclass
class Settings:
    root_dir: str
    max_depth: int
    max_file_size_kb: int
    ignore_dirs: Set[str]
    ignore_file_patterns: List[str]
    allowed_exts: Set[str]
    allowed_suffixes: Set[str]


def normalize_ext(ext: str) -> str:
    ext = ext.strip()
    if not ext:
        return ext
    if not ext.startswith("."):
        ext = "." + ext
    return ext.lower()


def is_ignored_dir(dir_name: str, settings: Settings) -> bool:
    return dir_name in settings.ignore_dirs


def matches_any_pattern(name: str, patterns: Sequence[str]) -> bool:
    for pat in patterns:
        if fnmatch.fnmatch(name, pat):
            return True
    return False


def is_allowed_file(filename: str, settings: Settings) -> bool:
    """
    Determina si el archivo es candidato a incluir:
    - No debe matchear ignore patterns
    - Debe estar dentro de allowed_exts o allowed_suffixes
    """
    base = os.path.basename(filename)

    # Ignorados por patrones explícitos
    if matches_any_pattern(base, settings.ignore_file_patterns):
        return False

    # Ignorados por binarios/extensiones típicas (por patrones)
    if matches_any_pattern(base.lower(), DEFAULT_IGNORE_BINARY_EXTS):
        return False

    lower = base.lower()

    # Sufijos compuestos permitidos (ej: ".env.example")
    for suf in settings.allowed_suffixes:
        if lower.endswith(suf.lower()):
            return True

    # Extensión simple permitida
    _, ext = os.path.splitext(lower)
    return ext in settings.allowed_exts


def within_size_limit(path: str, settings: Settings) -> bool:
    try:
        size_bytes = os.path.getsize(path)
    except OSError:
        # Si no se puede stat, mejor excluir (conservador)
        return False
    return size_bytes <= settings.max_file_size_kb * 1024


def safe_read_text(path: str) -> Tuple[str, Optional[str]]:
    """
    Intenta leer como UTF-8, y fallback con errors="replace".
    Devuelve (contenido, error_msg).
    """
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read(), None
    except UnicodeDecodeError:
        try:
            with open(path, "r", encoding="utf-8", errors="replace") as f:
                return f.read(), "UnicodeDecodeError: contenido leído con replacement."
        except Exception as e:
            return "", f"Error leyendo archivo (fallback): {type(e).__name__}: {e}"
    except Exception as e:
        return "", f"Error leyendo archivo: {type(e).__name__}: {e}"


def relpath(path: str, root: str) -> str:
    rp = os.path.relpath(path, root)
    # Normaliza separadores para output (más amigable cross-platform)
    return rp.replace(os.sep, "/")


# -----------------------------
# Scanning + Tree
# -----------------------------

def scan_project(settings: Settings) -> List[str]:
    """
    Recorre recursivamente el proyecto y devuelve lista de paths absolutos incluidos.
    Respeta:
      - max_depth
      - ignore_dirs
      - ignore_file_patterns + binarios
      - allowed_exts/suffixes
      - max_file_size_kb
    """
    included: List[str] = []
    root = os.path.abspath(settings.root_dir)

    for current_dir, dirnames, filenames in os.walk(root):
        # Calcula profundidad relativa
        rel_dir = os.path.relpath(current_dir, root)
        depth = 0 if rel_dir == "." else rel_dir.count(os.sep) + 1

        # Corte por max_depth: si estamos en el límite, no bajamos más
        if depth >= settings.max_depth:
            dirnames[:] = []
        else:
            # Filtra dirs ignorados in-place para que os.walk no entre
            dirnames[:] = [d for d in dirnames if not is_ignored_dir(d, settings)]

        # Filtra archivos
        for fn in sorted(filenames):
            abs_path = os.path.join(current_dir, fn)
            if not is_allowed_file(abs_path, settings):
                continue
            if not within_size_limit(abs_path, settings):
                continue
            included.append(abs_path)

    return included


def build_tree(included_files_abs: List[str], settings: Settings) -> str:
    """
    Construye un árbol estilo "tree" (ASCII) solo con lo incluido.
    """
    root = os.path.abspath(settings.root_dir)

    # Construimos un trie simple: dict anidado, donde None marca archivo
    trie: Dict[str, dict] = {}

    def insert(parts: List[str]):
        node = trie
        for p in parts[:-1]:
            node = node.setdefault(p, {})
        node.setdefault("__files__", set()).add(parts[-1])

    for abs_path in included_files_abs:
        rp = relpath(abs_path, root)
        parts = [p for p in rp.split("/") if p]
        if not parts:
            continue
        insert(parts)

    def render_node(node: dict, prefix: str = "") -> List[str]:
        lines: List[str] = []

        # carpetas
        dirs = sorted([k for k in node.keys() if k != "__files__"])
        files = sorted(list(node.get("__files__", [])))

        # combinamos entradas para dibujar conectores
        entries: List[Tuple[str, str]] = []
        for d in dirs:
            entries.append(("dir", d))
        for f in files:
            entries.append(("file", f))

        for i, (kind, name) in enumerate(entries):
            is_last = (i == len(entries) - 1)
            connector = "└── " if is_last else "├── "
            lines.append(prefix + connector + name + ("/" if kind == "dir" else ""))

            if kind == "dir":
                extension = "    " if is_last else "│   "
                lines.extend(render_node(node[name], prefix + extension))

        return lines

    header = "."
    lines = [header]
    lines.extend(render_node(trie, ""))
    return "\n".join(lines) + "\n"


# -----------------------------
# Output writers
# -----------------------------

def write_project_tree(tree_text: str, out_path: str) -> None:
    with open(out_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(tree_text)


def write_project_context(
    settings: Settings,
    included_files_abs: List[str],
    tree_text: str,
    out_path: str,
) -> None:
    root = os.path.abspath(settings.root_dir)
    now = datetime.now().astimezone()

    # Reglas de ignore visibles
    ignore_rules_lines = []
    ignore_rules_lines.append(f"- max_depth: {settings.max_depth}")
    ignore_rules_lines.append(f"- max_file_size_kb: {settings.max_file_size_kb}")
    ignore_rules_lines.append(f"- ignore_dirs: {sorted(settings.ignore_dirs)}")
    ignore_rules_lines.append(f"- ignore_file_patterns: {settings.ignore_file_patterns + DEFAULT_IGNORE_BINARY_EXTS}")
    ignore_rules_lines.append(f"- allowed_exts: {sorted(settings.allowed_exts)}")
    if settings.allowed_suffixes:
        ignore_rules_lines.append(f"- allowed_suffixes: {sorted(settings.allowed_suffixes)}")

    with open(out_path, "w", encoding="utf-8", newline="\n") as f:
        f.write("# Project Context Package\n\n")
        f.write(f"- Generated at: {now.isoformat(timespec='seconds')}\n")
        f.write(f"- Root: `{relpath(root, root)}` (current directory)\n\n")

        f.write("## Rules Used\n\n")
        for line in ignore_rules_lines:
            f.write(line + "\n")
        f.write("\n")

        f.write("## Included Tree\n\n")
        f.write("```text\n")
        f.write(tree_text)
        f.write("```\n\n")

        f.write("## File Contents\n\n")

        for abs_path in included_files_abs:
            rp = relpath(abs_path, root)
            content, err = safe_read_text(abs_path)

            f.write("```text\n")
            f.write(f"=== {rp} ===\n")
            if err:
                f.write(f"[WARN] {err}\n")
            f.write(content)
            # Asegura salto de línea final
            if not content.endswith("\n"):
                f.write("\n")
            f.write("```\n\n")


# -----------------------------
# CLI
# -----------------------------

def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate project_tree.txt and project_context.md for LLM context.",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument("--max-depth", type=int, default=8, help="Max directory depth to traverse from root.")
    parser.add_argument("--max-file-size-kb", type=int, default=200, help="Max file size (KB) to include.")
    parser.add_argument(
        "--ext",
        nargs="*",
        default=None,
        help=(
            "Allowed extensions (overrides defaults). Example: --ext .ts .tsx .md .json "
            "(Note: .env.example is handled as a suffix; use --suffix for that.)"
        ),
    )
    parser.add_argument(
        "--suffix",
        nargs="*",
        default=None,
        help="Allowed filename suffixes (overrides defaults). Example: --suffix .env.example",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    allowed_exts = set(map(normalize_ext, DEFAULT_ALLOWED_EXTS))
    allowed_suffixes = set(DEFAULT_ALLOWED_SUFFIXES)

    if args.ext is not None and len(args.ext) > 0:
        allowed_exts = set(map(normalize_ext, args.ext))

    if args.suffix is not None and len(args.suffix) > 0:
        allowed_suffixes = set(args.suffix)

    settings = Settings(
        root_dir=".",
        max_depth=max(1, int(args.max_depth)),
        max_file_size_kb=max(1, int(args.max_file_size_kb)),
        ignore_dirs=set(DEFAULT_IGNORE_DIRS),
        ignore_file_patterns=list(DEFAULT_IGNORE_FILE_PATTERNS),
        allowed_exts=allowed_exts,
        allowed_suffixes=allowed_suffixes,
    )

    included_files_abs = scan_project(settings)
    included_files_abs.sort(key=lambda p: relpath(p, os.path.abspath(settings.root_dir)))

    tree_text = build_tree(included_files_abs, settings)

    write_project_tree(tree_text, "project_tree.txt")
    write_project_context(settings, included_files_abs, tree_text, "project_context.md")

    print(f"Included files: {len(included_files_abs)}")
    print("Wrote: project_tree.txt")
    print("Wrote: project_context.md")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())