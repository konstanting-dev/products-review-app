import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

type Messages = {
  [key: string]: any;
};

class ValidationError extends Error {
  messages: Messages;

  constructor(messages: Messages) {
    super('Validation Error');
    this.name = 'Validation Error';
    this.messages = messages;
  }
}

export const validateBody = (scheme: Joi.Schema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const { error } = scheme.validate(body, {
      allowUnknown: true,
      stripUnknown: false,
      abortEarly: false,
    });

    if (error) {
      const errors: any = {};
      let hasError = false;

      error.details.forEach((detail: any) => {
        hasError = true;
        errors[detail.path[0]] = detail.message;
      });

      if (hasError) {
        throw new ValidationError(errors);
      }
    }

    next();
  } catch (e) {
    return res.status(422).json({
      message: e.message,
      errors: e.messages,
    });
  }
};
