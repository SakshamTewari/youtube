import { Button } from '@/components/ui/button';

interface SigninProps {
  onClose: () => void;
}

export const Signin = ({ onClose }: SigninProps) => {
  return (
    <div className='h-screen flex justify-center flex-col'>
      <div className='flex justify-center'>
        <a
          href='#'
          className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray100'
        >
          <div className='px-10'>
            <div className='text-3xl font-extrabold'>Sign In</div>
          </div>
          <div>
            <LabelledInput
              label='Username'
              placeholder='sakshamtewari3@gmail.com'
            />
            <LabelledInput
              label='Password'
              type={'password'}
              placeholder='123456'
            />
            <div className='flex justify-center pt-5'>
              <Button variant={'outline'} className='w-full' onClick={onClose}>
                Signin
              </Button>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
}

function LabelledInput({ label, placeholder, type }: LabelledInputType) {
  return (
    <div>
      <label className='block mb-2 text-sm text-black font-semibold pt-4'>
        {label}
      </label>
      <input
        type={type || 'text'}
        id='first_name'
        className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        placeholder={placeholder}
      ></input>
    </div>
  );
}
