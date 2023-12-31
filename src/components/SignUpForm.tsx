'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { createUser } from '@/redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

type MyCustomUserAuthFormProps = {
  transferLink: string;
} & React.HTMLAttributes<HTMLDivElement>;

interface SignUpFormInputs {
  email: string;
  password: string;
  cPassword: string;
}

export function SignupForm({
  className,
  transferLink,
  ...props
}: MyCustomUserAuthFormProps) {
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  const { user, isLoading } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: SignUpFormInputs) => {
    const { email, password, cPassword } = data;

    if (password !== cPassword) {
      return setError('Passwords do not match');
    }

    // create account
    setError('');
    dispatch(createUser({ email, password }));
  };

  const transfer = transferLink || '/';

  useEffect(() => {
    if (user.email && !isLoading) {
      navigate(transfer, { replace: true });
    }
  }, [user.email, navigate, isLoading, transfer]);

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Input
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <Input
              id="cPassword"
              placeholder="confirm password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('cPassword', {
                required: 'Confirm Password is required',
              })}
            />
            {errors.password && <p>{errors?.cPassword?.message}</p>}
          </div>

          {error && <p className="text-red-500 font-thin">{error}</p>}
          <Button>Create Account</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        className="flex items-center justify-between"
      >
        <p>Google</p>
        <FcGoogle />
      </Button>
    </div>
  );
}
