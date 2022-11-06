import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/banner/Banner'
import Navbar from '../components/navbar/Navbar'
import styles from '../styles/Home.module.css'
import SectionCards from '../components/sectionCards/SectionCards'
import {getVideos, getPopularVideos, getWatchItAgainVideos} from "./../lib/videos"
import { verifyToken } from '../lib/utils'
import { redirectUser } from '../utils/redirectUser'

export async function getServerSideProps(context) {
  const { userId, token } = await redirectUser(context);
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);

  console.log({ watchItAgainVideos });
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("Productivity");

  const travelVideos = await getVideos("indie music");
  const popularVideos = await getPopularVideos();
  return {
    props: {
      disneyVideos,
      travelVideos,
      productivityVideos,
      popularVideos,
      watchItAgainVideos
    }
  }
}

export default function Home({disneyVideos, travelVideos, productivityVideos, popularVideos, watchItAgainVideos}) {
  console.log({ watchItAgainVideos });
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <Navbar/>
        <Banner
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.jpg"
          videoId="Mij7pTfuex4"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards
            title="Watch it again"
            videos={watchItAgainVideos}
            size="small"
          />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  )
}
