import Card from "./../card/Card";
import styles from "./SectionCards.module.css";
import Link from "next/link";
import clsx from "classnames"

const SectionCards = (props) => {
  const { title, videos= [], size, shouldWrap = false, shouldScale } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((video, idx) => {
          return (
            <Link href={`/video/${video.id}`} key={video.id}>
              <a>
                <Card key={idx} id={idx} imgUrl={video.imgUrl} size={size} shouldScale={shouldScale}/>
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;