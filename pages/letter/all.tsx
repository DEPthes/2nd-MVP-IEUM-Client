import { LetterType } from '@/apis/getLetters';
import Layout from '@/components/layouts/layout';
import OnlyUser from '@/components/layouts/onlyUser';
import useLettersQuery from '@/hooks/queries/useLettersQuery';
import React, { useState } from 'react';

export default function All() {
  const [letterType, setLetterType] = useState<LetterType>('unread');
  const { letters } = useLettersQuery(letterType);
  console.log(letters);
  return (
    <OnlyUser>
      <Layout>
        <div>gg</div>
      </Layout>
    </OnlyUser>
  );
}
