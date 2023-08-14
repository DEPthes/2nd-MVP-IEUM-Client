import Layout from '@/components/layouts/layout';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

export default function Response({}: Props) {
  const router = useRouter();
  console.log(router.query);
  return <Layout>dd</Layout>;
}
