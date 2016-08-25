import React from 'react';
import { SchemaInput } from '../inputs';

export const formPeer = (field) =>
  <SchemaInput key={field.name} field={field} />;
