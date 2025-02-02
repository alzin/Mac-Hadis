// style
import "@/styles/loader.css"

const Loading = () => {
    return (
        <section className="w-full h-[calc(100vh-60px)] flex items-center justify-center">
            <span className="loader"></span>
        </section>
    )
};

export default Loading;
