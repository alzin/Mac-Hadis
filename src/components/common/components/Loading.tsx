import styles from "./Loading.module.css";

const Loading = () => {
    return (
        <section className="w-full h-[calc(100vh-60px)] flex items-center justify-center">
            <span className={styles.loader}></span>
        </section>
    )
};

export default Loading;