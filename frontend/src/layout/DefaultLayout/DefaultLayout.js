import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const DefaultLayout = ({ children }) => {
    return (
        <div className="wrapper">
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
