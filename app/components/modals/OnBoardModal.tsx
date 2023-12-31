'use client'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import Modal from './Modal'
import Heading from '../Heading'
import useOnBoardModal from '@/app/hooks/useOnBoardModal'
import CategoryInput from '../inputs/CategoryInput'
import {FiActivity} from 'react-icons/fi'
import {FaPeopleArrows,FaHandsHelping} from 'react-icons/fa'
import {RiMentalHealthFill} from 'react-icons/ri'
import {BsReddit} from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import useDashboard from '@/app/hooks/useDashboard'

function OnBoardModal() {

    const router = useRouter()
    const dashboard = useDashboard()

    const companies = [
        {
            label:"BetterHelp",
            icon:FaHandsHelping
        },
    ]

    const goals = [
        {
            label:"Improve Engagement",
            icon:FiActivity
        },
        {
            label:"Improve Mental Health",
            icon:RiMentalHealthFill
        },
        {
            label:"Increase Brand Exposure",
            icon:FaPeopleArrows
        }
    ]

    const onBoardModal = useOnBoardModal()

    const [isLoading,setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState:{
            errors,
        },
        watch,
        setValue
    } = useForm<FieldValues>({
        defaultValues:{
            company:'BetterHelp',
            goal:'Improve Mental Health'
        }
    })

    const goal = watch("goal")
    const company = watch('company')
    
    const setCustomValue = (id:string, value:any) => {
        setValue(id,value,{
            shouldValidate:true,
            shouldDirty:true,
            shouldTouch:true
        })
    }

    const onSubmit : SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)

        console.log(data)

        dashboard.onChangeCompany(company)

        router.push(`/dashboard`)

        onBoardModal.onClose()

        setIsLoading(false)

        // axios.post('/api/register',data)
        // .then(()=>{
        //     toast.success('Success')
        //     registerModal.onClose()
        //     loginModal.onOpen()
        // })
        // .catch((err)=>{
        //     toast.error("Something went wrong, please try again.")
        // })
        // .finally(()=>{
        //     setIsLoading(false)
        // })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Brand name / Company name' subtitle='Only 1 company for beta version'/>
            <div className="pt-2 flex items-center justify-center overflow-x-auto gap-4">
                {companies.map((item,index)=>{
                    return(
                        <CategoryInput
                            onClick={(company)=>{setCustomValue('company', company)}}
                            key={index}
                            label={item.label}
                            icon={item.icon}
                            selected={company===item.label}
                        />
                    )
                })}
            </div>
            {/* <Input id="name" label='Brand Name / Company Name' disabled={isLoading} register={register} errors={errors} required/> */}
            {/* <Heading title='Socials'/> */}
            {/* <Input id="instagram" label='Instagram @' disabled={isLoading} register={register} errors={errors} required/>
            <Input id="twitter" label='Twitter @' disabled={isLoading} register={register} errors={errors} required/> */}
            <Heading title='Your goal'/>
            <div className="pt-2 flex items-center justify-between overflow-x-auto gap-4">
                {goals.map((item,index)=>{
                    return(
                        <CategoryInput
                            onClick={(goal)=>{setCustomValue('goal', goal)}}
                            key={index}
                            label={item.label}
                            icon={item.icon}
                            selected={goal===item.label}
                        />
                    )
                })}
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={onBoardModal.isOpen}
            title="Give us some information"
            actionLabel='Generate'
            onClose={onBoardModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    )
}

export default OnBoardModal
