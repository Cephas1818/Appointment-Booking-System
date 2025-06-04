'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from '../components/Button'
import Input from '../components/inputs/Input'

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState:{errors} } = useForm<FieldValues>({
    defaultValues: { email: '', password: '' }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        router.push('/dashboard');
      }
      if (callback?.error) {
        alert(callback.error);
      }
    });
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="w-full max-w-md space-y-4">
        <Button
          label="Sign in with Google"
          icon={FcGoogle}
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
        />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
          <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
          <Button onClick={handleSubmit(onSubmit)} label="Sign in" />
        </form>
      </div>
    </div>
  )
}

export default LoginPage
