import * as React from "react";
import styles from "../components/create.module.css";
import axios from "axios";
import logo from "../Logo.svg";

const api = axios.create({
    baseURL: "http://localhost:5000/api/url/shorten",
});

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            longUrl: "",
            shortUrl: "",
            urlCode: "",
            err: false,
            errMessage: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        const target = event.target;
        const longUrl = target.longUrl;
        const urlCode = target.urlCode;

        this.setState({
            longUrl: longUrl,
            urlCode: urlCode,
        });
    };

    /* This is where the magic happens
     */
    handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        await api
            .post("/", {
                longUrl: data.get("longUrl"),
                urlCode: data.get("urlCode"),
            })
            .then((res) => {
                if (res.data.shortUrl == null) {
                    this.setState({ shortUrl: "Error" });
                    console.log(this.state.shortUrl);
                } else {
                    this.setState({ shortUrl: res.data.shortUrl });
                    console.log(this.state.shortUrl);
                }
                this.setState.longUrl = "";
            })
            .catch((error) => {
                console.error(error);
                this.setState({ err: true });
                this.setState({ errorMessage: error.message });
            });
    };

    render() {
        return (
            <div className={styles.container}>
                <a href="http://fleetinglink.com/">
                    <img className={styles.logo} src={logo} alt="Logo"></img>
                </a>
                <div className={styles.navigation}>
                    <ul>
                        <li>Usage</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <div className={styles.text}>Temporary and memorable links</div>
                <div className={styles.borderBox} />
                <div className={styles.cardBehind} />
                <div className={styles.card}>
                    <form onSubmit={this.handleSubmit}>
                        <div className={styles.formGroup}>
                            <label>
                                PASTE LINK:
                                <input
                                    name="longUrl"
                                    type="text"
                                    value={this.state.longUrl}
                                    onChange={this.handleChange}
                                    placeholder="www.url.com"
                                />
                            </label>
                            <br />
                            <label>
                                ENTER ALIAS:
                                <input
                                    name="urlCode"
                                    type="text"
                                    value={this.state.urlCode}
                                    onChange={this.handleChange}
                                    placeholder="alias"
                                />
                            </label>
                            <br />
                        </div>
                        <input
                            className={styles.submit}
                            type="submit"
                            value="Genrate Link"
                        />
                    </form>
                </div>
                <div className={styles.backgroundTexture} />
            </div>
        );
    }
}

export default Create;
