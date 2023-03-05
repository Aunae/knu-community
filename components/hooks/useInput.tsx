'use client';

import React, { useState } from 'react';

const useInput = (initVal: string = '') => {
  const [form, setForm] = useState(initVal);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm(e.target.value);
  return { onChange, value: form };
};

export default useInput;
