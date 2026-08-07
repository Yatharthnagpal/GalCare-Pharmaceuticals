import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const referenceId = uuidv4();
  
  // Log full error details to console
  console.error(`[Error Reference: ${referenceId}]`, {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    body: req.body,
    params: req.params,
    query: req.query,
    ip: req.ip,
  });

  // Prisma unique constraint error
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: 'A record with this value already exists.',
      referenceId,
    });
  }

  // Prisma record not found error
  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Record not found.',
      referenceId,
    });
  }
  
  // Zod validation error (if we have a global error catching them, otherwise handle in middleware)
  if (err.name === 'ZodError') {
     return res.status(400).json({
       success: false,
       message: 'Validation failed',
       errors: err.errors,
       referenceId
     });
  }

  // Default internal server error
  // NEVER expose internal details to client
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    referenceId,
  });
};
