'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { AxiosError } from 'axios'

import ButtonSubmit from '@/components/ui/button-submit'
import placeholder from '@/public/placehorder.jpg'
import { useAuthProvider } from '@/components/common/AuthProvider'

import { EditUserFormType, editUserFormSchema } from '@/schemas/edit-user-schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form'
import { toast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { editUserAciton } from '@/utils/action/editUserAction'
import { renderImage } from '@/utils/action/render'
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'

export default function EditUserForm({ params }: { params: { username: string } }) {
  const { user } = useAuthProvider((state) => state)
  const router = useRouter()
  const source = user.image?.name ? renderImage.webp(user.image?.name!) : placeholder
  const form = useForm<EditUserFormType>({
    resolver: zodResolver(editUserFormSchema),
  })

  const onSubmit = async (payload: EditUserFormType) => {
    try {
      const submit = await editUserAciton(payload, params.username).then(async (res) => {
        const token = await res.data.access_token
        setCookie('access_token', token)
        return res
      })

      toast({
        title: submit.data.title,
        description: submit.data.description,
      })

      router.back()
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: error.response?.data.message,
          description: error.response?.data.cause,
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-5'
      >
        <div className='mx-auto w-fit md:mx-0'>
          <FormField
            control={form.control}
            name="avatar"
            render={({ field: { value, ...fieldValues } }) => {
              return (
                <FormItem>
                  <FormLabel>
                    <Image
                      src={form.getValues('avatar') ? window.URL.createObjectURL(form.getValues('avatar')!) : source}
                      alt="Profile Image"
                      width={160}
                      height={160}
                      className="aspect-square rounded-full object-cover"
                    />
                    <span></span>
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...fieldValues}
                      accept="image/*"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        fieldValues.onChange(file)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </div>

        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input
                  defaultValue={user.firstname && user.firstname}
                  placeholder={user.firstname || 'Firstname'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input
                  defaultValue={user.lastname && user.lastname}
                  placeholder={user.lastname || 'Lastname'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  defaultValue={user.username && user.username}
                  placeholder={user.username || 'Username'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  defaultValue={user.email && user.email}
                  placeholder={user.email || 'Email'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  defaultValue={user.address && user.address}
                  placeholder={user.address || 'Address'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input
                  defaultValue={user.phoneNumber && user.phoneNumber}
                  placeholder={user.phoneNumber || 'Phone Number'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonSubmit
          isSubmitting={form.formState.isSubmitting}
          label="Submit your changes"
          className="w-full"
        />
      </form>
    </Form>
  )
}
