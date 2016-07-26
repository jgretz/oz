import mongoose from 'mongoose';

export const Schema = mongoose.model('schema', {
  name: String,
  icon: String,
  fields: [{
    name: String,
    field_type: String,
    required: Boolean
  }],
});
