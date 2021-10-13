import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Link prefetch={false} href={{
        pathname: '/[username]',
        query: { username: 'jeffd23' },
      }}>
        <a>Jeff's Profile</a>
      </Link>
    </div>
  );
}
