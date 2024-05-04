

'use client'

import React from 'react'
import Image from 'next/image'
import HomeCard from './HomeCard'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import DialogForHome from './DialogForHome'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { Call } from '@stream-io/video-react-sdk'
import { useToast } from './ui/use-toast'
import { title } from 'process'
import { Textarea } from './ui/textarea'
import ReactDatePicker from "../node_modules/react-datepicker"
import { Input } from './ui/input'
// import { useToast } from './ui/use-toast';





const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

const MeetingTypeList = () => {
  // const {toast}= useToast();
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const { toast } = useToast();


  const {user} = useUser();
  const client = useStreamVideoClient();

  const createMeeting =async()=>{
    if(!client||!user){
      return;
    }
    try {
      if (!values.dateTime) {
        toast({ title: 'Please select a date and time' });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default',id);
      if(!call) throw new Error("Failed to create call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: 'Meeting Created',
      });

    } catch (error) { 
      console.log(error);
      toast({ title: 'Failed to create Meeting' });

    }

  }
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`
  
  return (
    <div className='grid gris-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handleClick={() => router.push('/recordings')}
      />

      {
        !callDetail ? (
          <DialogForHome
            isOpen={meetingState === 'isScheduleMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Create Meeting"
            handleClick={createMeeting}
          >

            <div className='flex flex-col gap-2.5'>

              <label className='text-base text-normal leading-[22px] text-sky-2'>Add a description</label>
              <Textarea className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0' onChange={(e)=>{
                setValues({...values,description:e.target.value})
              }} />

            </div>
            <div className='flex flex-col gap-2.5 w-full'>
              <label className='text-base text-normal leading-[22px] text-sky-2'>Select date and time</label>

              <ReactDatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date! })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded bg-dark-3 p-2 focus:outline-none"
               />


            </div>


          </DialogForHome>  
          

        ):(
          <DialogForHome
            isOpen={meetingState === 'isScheduleMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Meeting Created"
            handleClick={()=>{
              navigator.clipboard.writeText(meetingLink);
              toast({ title: 'Link Copied' });
            }}
            buttonText="Copy Meeting Link"
            className="text-center"
            // toast({title:'Link Copied'})
            image='/icons/checked.svg'
            buttonIcon='/icons/copy.svg'
            
          />

        )
      }

      <DialogForHome
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant Meeting"
        handleClick={createMeeting}
        buttonText="Start Meeting"
        className="text-center"
       />

      <DialogForHome
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type Link Here"
        handleClick={()=>router.push(`http://${values.link}`)}
        buttonText="Join Meeting"
        className="text-center"
       >
        <Input placeholder='Meeting Link' className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
          onChange={(e)=>setValues({...values,link:e.target.value})}
         />

        
       </DialogForHome>

      



    </div>
  )
}

export default MeetingTypeList