export type ErrorDetailDTO = {
  field: string;
  reason: string;
};

export type ErrorResponseDTO = {
  error: {
    code: string;
    message: string;
    details?: ErrorDetailDTO[];
    requestId: string;
  };
};
