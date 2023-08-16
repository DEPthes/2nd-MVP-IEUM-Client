import Layout from '@/components/layouts/layout';
import Image from 'next/image';
import PolygonIcon from '../public/icons/polygon.svg';
import PencilIcon from '../public/icons/pencil.svg';
import EnvelopeIcon from '../public/icons/envelope.svg';
import PersonIcon from '../public/icons/person.svg';
import AIIcon from '../public/icons/ai.svg';
import MailboxIcon from '../public/icons/mailbox.svg';
import SendIcon from '../public/icons/send.svg';
import { useRef } from 'react';
import { scrollIntoViewWithOffset } from '@/utils/scrollIntoViewWithOffset';

export default function Home() {
  const section2 = useRef<HTMLSelectElement>(null);
  function scrollToSection2() {
    // section2.current?.scrollIntoView({ behavior: 'smooth', });
    scrollIntoViewWithOffset(section2, { top: 78 });
  }
  return (
    // <ProtectedLayout>
    <Layout>
      <main className='flex flex-col items-center px-24 pb-30 tablet:px-32 desktop:px-64'>
        <section className=' bg-letter_bg w-full h-full py-8 px-4 mb-24'>
          <div className='flex flex-col items-center border-dashed border-1 border-black px-26 pt-65 pb-34'>
            <Image className='mb-64' src={'/imgs/logo2.png'} alt='logo' width={166} height={124} />
            <h1 className='block font-heading--md text-hover mb-64 desktop:font-heading--lg'>
              이:음에서는 이렇게 소통해요!
            </h1>
            <h4 className='block font-label--md text-hover text-center px-22 desktop:font-label--lg'>
              {'이:음은 랜덤 익명 편지 서비스에요.\n자신의 감정을 글로 적는 과정에서 해소가 이루어지기도 하고'}
            </h4>
            <h4 className='block font-label--md text-hover text-center mb-64 desktop:font-label--lg'>
              {'익명의 누군가와 편지를 주고 받으며 예상치 못한 사람에게 예상치 못한 답변을 받기도 하죠.'}
            </h4>
            <h2 className='block font-heading--md text-hover mb-64 desktop:font-heading--lg'>
              이:음에서 이러한 경험을 해보세요!
            </h2>
            <button onClick={scrollToSection2}>
              <PolygonIcon />
            </button>
          </div>
        </section>
        <section ref={section2} className=' bg-letter_bg w-full h-full py-8 px-4'>
          <div className='flex flex-col items-center border-dashed border-1 border-black px-15 pt-26 pb-4'>
            <h1 className=' font-heading--md text-hover mb-36 desktop:font-heading--lg'>
              이:음에서는 이렇게 소통해요!
            </h1>
            <article className='flex flex-col items-center w-full py-10 bg-tertiary rounded-10 mb-24 px-24'>
              <h5 className=' mb-20 text-hover font-heading--sm text-center desktop:font-heading--md'>
                편지 발송 방법
              </h5>

              <div className='flex flex-col gap-20 w-full tablet:max-w-500 desktop:w-730'>
                <div className='flex items-center gap-27'>
                  <PencilIcon className=' shrink-0' />
                  <span className='block text-hover font-paragraph--sm whitespace-pre-wrap desktop:font-paragraph--md'>
                    편지 작성 페이지에서 자유롭게 편지를 작성해요. 어떤 이야기든 좋아요.
                  </span>
                </div>
                <div className='flex items-center gap-27'>
                  <EnvelopeIcon className=' shrink-0' />
                  <span className='block text-hover font-paragraph--sm whitespace-pre-wrap desktop:font-paragraph--md'>
                    마음을 담아 편지 봉투를 골라주세요. 편지 봉투는 수신인에게 전달돼요.
                  </span>
                </div>
                <div className='flex items-center gap-27'>
                  <PersonIcon className=' shrink-0' />
                  <div>
                    <div className='flex items-center gap-5 pl-5'>
                      <div className='w-3 h-3 rounded-full bg-hover' />
                      <span className=' font-label--sm desktop:font-label--md'>사람에게 보내기</span>
                    </div>
                    <span className='block text-hover font-paragraph--sm whitespace-pre-wrap desktop:font-paragraph--md'>
                      {
                        '익명의 누군가에게 랜덤으로 발송돼요.\n제약없이 나의 이야기를 털어놓고 진심이 담긴 답장을 받을 수 있어요.'
                      }
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-27'>
                  <AIIcon className=' shrink-0' />
                  <div>
                    <div className='flex items-center gap-5 pl-5'>
                      <div className='w-3 h-3 rounded-full bg-hover' />
                      <span className=' font-label--sm desktop:font-label--md'>AI에게 보내기</span>
                    </div>
                    <span className='block text-hover font-paragraph--sm whitespace-pre-wrap desktop:font-paragraph--md'>
                      나의 이야기에 대한 해결책을 즉시 얻고싶을 때 추천해요.
                    </span>
                  </div>
                </div>
              </div>
            </article>
            <article className='flex flex-col items-center w-full py-10 bg-tertiary rounded-10 mb-34 px-24'>
              <h5 className='mb-20 text-hover font-heading--sm text-center desktop:font-heading--md'>편지 수신 방법</h5>
              <div className='flex flex-col gap-20 w-full tablet:max-w-500 desktop:w-730'>
                <div className='flex items-center gap-27'>
                  <MailboxIcon className=' shrink-0' />
                  <span className='block text-hover font-paragraph--sm whitespace-pre-wrap desktop:font-paragraph--md'>
                    나에게 오는 편지는 모두 우체통에 저장돼요.
                  </span>
                </div>
                <div className='flex items-center gap-27'>
                  <SendIcon className=' shrink-0' />
                  <span className='block text-hover font-paragraph--sm whitespace-pre-wrap desktop:font-paragraph--md'>
                    편지가 도착하는 즉시 이메일로 편지 도착 소식을 알려드리니 회원가입 시 이메일 수신 동의에 꼭
                    체크해주세요!
                  </span>
                </div>
              </div>
            </article>
            <button className='py-8 px-22 rounded-10 bg-primary text-tertiary font-label--md hover:bg-hover active:bg-hover'>
              편지 작성하기
            </button>
          </div>
        </section>
      </main>
    </Layout>
    // </ProtectedLayout>
  );
}
