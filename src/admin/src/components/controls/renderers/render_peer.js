import React from 'react';
import { SchemaInput } from '../schema_input';

export const renderPeer = (field) =>
  <SchemaInput key={field.name} field={field} />;
