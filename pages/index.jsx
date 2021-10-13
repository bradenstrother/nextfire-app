import toast from 'react-hot-toast';

export default function Home() {
  return (
    <div>
      <button onClick={() => toast.success('hello toast!')}>
        Toast Me
      </button>
    </div>
  );
}

// import Head from 'next/head';
// import styles from '../styles/Home.module.css';
// import Link from 'next/link';

// import Loader from '../components/Loader';

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Link prefetch={false} href={{
//         pathname: '/[username]',
//         query: { username: 'jeffd23' },
//       }}>
//         <a>Jeff's Profile</a>
//       </Link>
//       <Loader show />
//     </div>
//   );
// }