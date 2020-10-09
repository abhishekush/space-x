import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import MissionInfo from '../components/MissionInfo';
import styles from '../styles/Home.module.css';
import MissionFilter from '../components/MissionFilter';

export function urlEncodeQueryParams(data) {
    const params = Object.keys(data).map((key) =>
        data[key] || typeof data[key] === 'boolean'
            ? `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
            : ''
    );
    return params.filter((value) => !!value).join('&');
}

async function getMissions(param = {}) {
    const queryParams = urlEncodeQueryParams({ ...param, limit: 100 });
    const response = await fetch(`https://api.spaceXdata.com/v3/launches?${queryParams}`);
    return response.json();
}

function Home(props) {
    const [missions, setMissions] = useState([]);

    const onFilterUpdate = useCallback(async (params) => {
        try {
            const resArr = await getMissions(params);
            setMissions(resArr);
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className={styles.container} style={{ backgroundColor: '#f7f7f7' }}>
            <Head>
                <title>Space-X Missions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.content}>
                <div className={styles.gridRow}>
                    <div className={styles.filterDiv}>
                        <MissionFilter onUpdate={onFilterUpdate} />
                    </div>
                    <div className={styles.mainDiv}>
                        <div
                            className={styles.gridRow}
                            style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {(missions.length ? missions : props.missions).map((data) => {
                                return (
                                    <MissionInfo
                                        key={`${data.mission_name}#${data.flight_number}}`}
                                        image={data.links.mission_patch}
                                        missionName={data.mission_name}
                                        flightNumber={data.flight_number}
                                        missionId={data.mission_id}
                                        launchYear={data.launch_year}
                                        successfulLaunch={data.launch_success}
                                        successfulLanding={data.launch_landing}
                                        //
                                    />
                                );
                            })}
                        </div>
                    </div>

                    <footer className={styles.footer}>
                        <span>Developed By: Abhishek Mishra</span>
                    </footer>
                </div>
            </div>
        </div>
    );
}

const propTypes = {
    missions: PropTypes.array.isRequired
};

export async function getStaticProps() {
    const missions = await getMissions();

    return {
        props: {
            missions
        }
    };
}

Home.propTypes = propTypes;

export default Home;
