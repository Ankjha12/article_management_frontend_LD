import React from 'react';

interface InputFileProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  value: string | null;
}

const InputFile: React.FC<InputFileProps> = ({ setFieldValue, value }) => {
  const [error, setError] = React.useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {

      const maxSize = 4 * 1024 * 1024;
      if (file.size > maxSize) {
        setError('File size exceeds 4 MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFieldValue('image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {value && (
        <div>
          <p>Base64 Output:</p>
          <img src={value} alt="Selected" style={{ width: '100px', height: '100px' }} />
        </div>
      )}
    </div>
  );
};

export default InputFile;
