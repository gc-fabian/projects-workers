#!/usr/bin/env python3
"""
make_context.py

Genera un paquete de contexto del proyecto para entregárselo a un LLM,
separado por dominios/capas para evitar un único archivo gigante.

Salidas:
- project_tree.txt
- context_chunks/
    - 00_manifest.md
    - 01_backend_context.md
    - 02_frontend_context.md
    - 03_database_context.md
    - 04_auth_context.md
    - 05_projects_context.md
    - 06_workers_context.md
    - 07_backend_shared_context.md
    - 99_misc_context.md

Modos:
- full-content (default): incluye contenido completo
- summary-only: incluye resumen estructural por archivo

Ejecución:
  python make_context.py

Ejemplos:
  python make_context.py --mode summary-only
  python make_context.py --max-depth 6 --max-file-size-kb 150 --ext .ts .tsx .md
  python make_context.py --mode full-content --out-dir context_chunks
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
    "context_chunks",  # evita auto-incluir salidas generadas
}

DEFAULT_IGNORE_FILE_PATTERNS = [
    "*.log",
    "*.lock",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "project_context.md",
    "project_tree.txt",
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
    "*.woff",
    "*.woff2",
    "*.ttf",
    "*.ico",
    "*.mp4",
    "*.mp3",
]

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
# Models
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
    mode: str
    out_dir: str


# -----------------------------
# Helpers
# -----------------------------

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
    base = os.path.basename(filename)

    if matches_any_pattern(base, settings.ignore_file_patterns):
        return False

    if matches_any_pattern(base.lower(), DEFAULT_IGNORE_BINARY_EXTS):
        return False

    lower = base.lower()

    for suf in settings.allowed_suffixes:
        if lower.endswith(suf.lower()):
            return True

    _, ext = os.path.splitext(lower)
    return ext in settings.allowed_exts


def within_size_limit(path: str, settings: Settings) -> bool:
    try:
        size_bytes = os.path.getsize(path)
    except OSError:
        return False
    return size_bytes <= settings.max_file_size_kb * 1024


def safe_read_text(path: str) -> Tuple[str, Optional[str]]:
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
    return rp.replace(os.sep, "/")


def ensure_dir(path: str) -> None:
    os.makedirs(path, exist_ok=True)


def detect_file_kind(rp: str) -> str:
    name = rp.lower()

    if name.endswith(".routes.ts") or "/routes/" in name:
        return "routes"
    if name.endswith(".controller.ts"):
        return "controller"
    if name.endswith(".service.ts"):
        return "service"
    if name.endswith(".repository.ts"):
        return "repository"
    if name.endswith(".schemas.ts") or "/schemas/" in name:
        return "schema"
    if name.endswith(".dtos.ts") or "/types/" in name:
        return "dto/types"
    if name.endswith(".mappers.ts"):
        return "mapper"
    if "prisma/schema.prisma" in name:
        return "prisma-schema"
    if "/migrations/" in name and name.endswith(".sql"):
        return "migration"
    if name.endswith(".tsx") and "/pages/" in name:
        return "page"
    if name.endswith(".tsx") and "/components/" in name:
        return "component"
    if name.endswith(".ts") and "/hooks/" in name:
        return "hook"
    if name.endswith(".ts") and "/api/" in name:
        return "api-client"
    if name.endswith(".md"):
        return "documentation"
    if name.endswith(".json"):
        return "config/data"
    return "source-file"


def classify_file(rp: str) -> str:
    rp = rp.replace("\\", "/")

    if rp.startswith("apps/api/prisma/"):
        return "03_database_context.md"

    if "modules/auth/" in rp or "features/auth/" in rp:
        return "04_auth_context.md"

    # assignments antes que projects para separar workers del project_worker
    if "projectsWorkers" in rp or "useProjectAssignments" in rp:
        return "07_assignments_context.md"

    if "modules/projects/" in rp or "features/projects/" in rp:
        return "05_projects_context.md"

    if "modules/workers/" in rp:
        return "06_workers_context.md"

    if rp.startswith("apps/api/src/shared/") or rp.startswith("apps/api/src/app/"):
        return "07_backend_shared_context.md"

    if rp.startswith("apps/api/"):
        return "01_backend_context.md"

    if rp.startswith("apps/web/"):
        return "02_frontend_context.md"

    return "99_misc_context.md"


# -----------------------------
# Scan
# -----------------------------

def scan_project(settings: Settings) -> List[str]:
    included: List[str] = []
    root = os.path.abspath(settings.root_dir)

    for current_dir, dirnames, filenames in os.walk(root):
        rel_dir = os.path.relpath(current_dir, root)
        depth = 0 if rel_dir == "." else rel_dir.count(os.sep) + 1

        if depth >= settings.max_depth:
            dirnames[:] = []
        else:
            dirnames[:] = [d for d in dirnames if not is_ignored_dir(d, settings)]

        for fn in sorted(filenames):
            abs_path = os.path.join(current_dir, fn)
            if not is_allowed_file(abs_path, settings):
                continue
            if not within_size_limit(abs_path, settings):
                continue
            included.append(abs_path)

    return included


# -----------------------------
# Tree builder
# -----------------------------

def build_tree(included_files_abs: List[str], settings: Settings) -> str:
    root = os.path.abspath(settings.root_dir)
    trie: Dict[str, dict] = {}

    def insert(parts: List[str]) -> None:
        node = trie
        for p in parts[:-1]:
            node = node.setdefault(p, {})
        node.setdefault("__files__", set()).add(parts[-1])

    for abs_path in included_files_abs:
        rp = relpath(abs_path, root)
        parts = [p for p in rp.split("/") if p]
        if parts:
            insert(parts)

    def render_node(node: dict, prefix: str = "") -> List[str]:
        lines: List[str] = []
        dirs = sorted([k for k in node.keys() if k != "__files__"])
        files = sorted(list(node.get("__files__", [])))

        entries: List[Tuple[str, str]] = []
        for d in dirs:
            entries.append(("dir", d))
        for f in files:
            entries.append(("file", f))

        for i, (kind, name) in enumerate(entries):
            is_last = i == len(entries) - 1
            connector = "└── " if is_last else "├── "
            lines.append(prefix + connector + name + ("/" if kind == "dir" else ""))

            if kind == "dir":
                extension = "    " if is_last else "│   "
                lines.extend(render_node(node[name], prefix + extension))
        return lines

    lines = ["."]
    lines.extend(render_node(trie, ""))
    return "\n".join(lines) + "\n"


# -----------------------------
# Summary mode
# -----------------------------

def extract_interesting_lines(lines: List[str], rp: str) -> Dict[str, List[str]]:
    imports: List[str] = []
    exports: List[str] = []
    functions: List[str] = []
    classes: List[str] = []
    routes: List[str] = []
    constants: List[str] = []
    types_: List[str] = []
    others: List[str] = []

    lower_rp = rp.lower()

    for line in lines:
        s = line.strip()
        if not s:
            continue

        if s.startswith("import "):
            imports.append(s)
            continue

        if s.startswith("export "):
            exports.append(s)

        if s.startswith("class "):
            classes.append(s)
            continue

        if s.startswith("interface ") or s.startswith("type "):
            types_.append(s)
            continue

        if (
            "function " in s
            or s.startswith("const ")
            or s.startswith("async ")
            or s.startswith("export async function ")
            or s.startswith("export function ")
        ):
            functions.append(s)
            continue

        if any(token in s for token in [".get(", ".post(", ".patch(", ".delete(", ".put("]):
            routes.append(s)
            continue

        if s.startswith("model ") or s.startswith("generator ") or s.startswith("datasource "):
            others.append(s)
            continue

        if lower_rp.endswith(".sql") and (
            "create table" in s.lower()
            or "alter table" in s.lower()
            or "create index" in s.lower()
            or "foreign key" in s.lower()
        ):
            others.append(s)
            continue

        if s.startswith("export const ") or s.isupper():
            constants.append(s)
            continue

    return {
        "Imports relevantes": imports[:12],
        "Exports": exports[:12],
        "Funciones/líneas clave": functions[:18],
        "Clases": classes[:10],
        "Tipos/interfaces": types_[:12],
        "Rutas detectadas": routes[:12],
        "Constantes": constants[:10],
        "Observaciones estructurales": others[:20],
    }


def summarize_file_content(abs_path: str, rp: str, content: str) -> str:
    lines = content.splitlines()
    head = lines[:120]
    stats = extract_interesting_lines(head, rp)
    file_kind = detect_file_kind(rp)

    out: List[str] = []
    out.append(f"## {rp}")
    out.append("")
    out.append(f"- Tipo inferido: {file_kind}")
    out.append(f"- Líneas totales aprox.: {len(lines)}")
    out.append("")

    has_section = False
    for title, items in stats.items():
        if not items:
            continue
        has_section = True
        out.append(f"### {title}")
        out.append("")
        for item in items:
            out.append(f"- {item}")
        out.append("")

    if not has_section:
        preview = head[:20]
        out.append("### Preview")
        out.append("")
        out.append("```text")
        out.extend(preview)
        out.append("```")
        out.append("")

    return "\n".join(out).rstrip() + "\n"


# -----------------------------
# Writers
# -----------------------------

def write_project_tree(tree_text: str, out_path: str) -> None:
    with open(out_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(tree_text)


def write_manifest(
    settings: Settings,
    included_files_abs: List[str],
    tree_text: str,
    grouped: Dict[str, List[str]],
) -> None:
    root = os.path.abspath(settings.root_dir)
    now = datetime.now().astimezone()
    out_path = os.path.join(settings.out_dir, "00_manifest.md")

    total_files = len(included_files_abs)

    with open(out_path, "w", encoding="utf-8", newline="\n") as f:
        f.write("# Project Manifest\n\n")
        f.write(f"- Generated at: {now.isoformat(timespec='seconds')}\n")
        f.write(f"- Root: `{relpath(root, root)}` (current directory)\n")
        f.write(f"- Mode: `{settings.mode}`\n")
        f.write(f"- Total included files: **{total_files}**\n\n")

        f.write("## Rules Used\n\n")
        f.write(f"- max_depth: {settings.max_depth}\n")
        f.write(f"- max_file_size_kb: {settings.max_file_size_kb}\n")
        f.write(f"- ignore_dirs: {sorted(settings.ignore_dirs)}\n")
        f.write(f"- ignore_file_patterns: {settings.ignore_file_patterns + DEFAULT_IGNORE_BINARY_EXTS}\n")
        f.write(f"- allowed_exts: {sorted(settings.allowed_exts)}\n")
        f.write(f"- allowed_suffixes: {sorted(settings.allowed_suffixes)}\n\n")

        f.write("## Generated Groups\n\n")
        for group_name in sorted(grouped.keys()):
            f.write(f"- `{group_name}`: {len(grouped[group_name])} archivos\n")
        f.write("\n")

        f.write("## Included Tree\n\n")
        f.write("```text\n")
        f.write(tree_text)
        f.write("```\n\n")

        f.write("## Key Handoff Recommendation\n\n")
        f.write(
            "Pasa primero este manifest al LLM, luego solo el chunk del dominio relevante "
            "(auth, projects, workers, database, etc.) según la etapa que estés implementando.\n"
        )


def write_group_file(
    settings: Settings,
    group_name: str,
    files: List[str],
) -> None:
    root = os.path.abspath(settings.root_dir)
    out_path = os.path.join(settings.out_dir, group_name)

    with open(out_path, "w", encoding="utf-8", newline="\n") as f:
        title = group_name.replace(".md", "").replace("_", " ").title()
        f.write(f"# {title}\n\n")
        f.write(f"- Group file: `{group_name}`\n")
        f.write(f"- Files included: **{len(files)}**\n")
        f.write(f"- Mode: `{settings.mode}`\n\n")

        for abs_path in sorted(files, key=lambda p: relpath(p, root)):
            rp = relpath(abs_path, root)
            content, err = safe_read_text(abs_path)

            if settings.mode == "summary-only":
                if err:
                    f.write(f"## {rp}\n\n")
                    f.write(f"- [WARN] {err}\n\n")
                    continue

                summary = summarize_file_content(abs_path, rp, content)
                f.write(summary)
                f.write("\n")
                continue

            # full-content
            f.write("```text\n")
            f.write(f"=== {rp} ===\n")
            if err:
                f.write(f"[WARN] {err}\n")
            f.write(content)
            if not content.endswith("\n"):
                f.write("\n")
            f.write("```\n\n")


def write_chunked_contexts(
    settings: Settings,
    included_files_abs: List[str],
    tree_text: str,
) -> None:
    root = os.path.abspath(settings.root_dir)
    ensure_dir(settings.out_dir)

    grouped: Dict[str, List[str]] = {}
    for abs_path in included_files_abs:
        rp = relpath(abs_path, root)
        group_name = classify_file(rp)
        grouped.setdefault(group_name, []).append(abs_path)

    write_manifest(settings, included_files_abs, tree_text, grouped)

    for group_name in sorted(grouped.keys()):
        write_group_file(settings, group_name, grouped[group_name])


# -----------------------------
# CLI
# -----------------------------

def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate project_tree.txt and chunked context files for LLM handoff.",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument(
        "--max-depth",
        type=int,
        default=8,
        help="Max directory depth to traverse from root.",
    )
    parser.add_argument(
        "--max-file-size-kb",
        type=int,
        default=200,
        help="Max file size (KB) to include.",
    )
    parser.add_argument(
        "--ext",
        nargs="*",
        default=None,
        help=(
            "Allowed extensions (overrides defaults). "
            "Example: --ext .ts .tsx .md .json"
        ),
    )
    parser.add_argument(
        "--suffix",
        nargs="*",
        default=None,
        help="Allowed filename suffixes (overrides defaults). Example: --suffix .env.example",
    )
    parser.add_argument(
        "--mode",
        choices=["full-content", "summary-only"],
        default="full-content",
        help="Whether to include full file contents or only structural summaries.",
    )
    parser.add_argument(
        "--out-dir",
        default="context_chunks",
        help="Output directory for chunked markdown files.",
    )
    return parser.parse_args()


# -----------------------------
# Main
# -----------------------------

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
        mode=args.mode,
        out_dir=args.out_dir,
    )

    included_files_abs = scan_project(settings)
    included_files_abs.sort(key=lambda p: relpath(p, os.path.abspath(settings.root_dir)))

    tree_text = build_tree(included_files_abs, settings)

    write_project_tree(tree_text, "project_tree.txt")
    write_chunked_contexts(settings, included_files_abs, tree_text)

    print(f"Included files: {len(included_files_abs)}")
    print("Wrote: project_tree.txt")
    print(f"Wrote chunked context files in: {settings.out_dir}/")
    print(f"Mode: {settings.mode}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())