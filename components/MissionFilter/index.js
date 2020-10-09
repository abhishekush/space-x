import PropTypes from 'prop-types';
import { useState, useCallback, useEffect, useRef } from 'react';
import styles from '../../styles/Home.module.css';

const currentYear = new Date().getFullYear();
const startYear = 2006;
const yearArray = Array.from({ length: currentYear - startYear + 1 }, (v, k) => startYear + k);

const booleanButtons = [1, 0];

const propTypes = {
    onUpdate: PropTypes.func.isRequired
};

const Title = ({ children }) => (
    <>
        <p style={{ fontSize: 14, marginBottom: 0 }}>{children}</p>
        <div
            style={{
                borderTopWidth: 1,
                borderTopColor: '#000',
                borderTopStyle: 'solid',
                width: '70%',
                marginBottom: 5
            }}></div>
    </>
);

Title.propTypes = {
    children: PropTypes.string.isRequired
};

const MissionFilter = (props) => {
    const [selectedYear, changeYear] = useState();
    const isFirstRun = useRef(true);
    const { onUpdate } = props;
    const [successfulLaunch, toggleSuccessfulLaunch] = useState();

    const [successfulLanding, toggleSuccessfulLanding] = useState();
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        onUpdate({
            launch_success: successfulLaunch,
            land_success: successfulLanding,
            launch_year: selectedYear
        });
    }, [successfulLanding, successfulLaunch, selectedYear, onUpdate]);

    const onClickSuccessfulLaunch = useCallback(
        (bool) => () =>
            Boolean(bool) === successfulLaunch
                ? toggleSuccessfulLaunch()
                : toggleSuccessfulLaunch(Boolean(bool)),
        [successfulLaunch, toggleSuccessfulLaunch]
    );

    const onClickSuccessfulLanding = useCallback(
        (bool) => () =>
            Boolean(bool) === successfulLanding
                ? toggleSuccessfulLanding()
                : toggleSuccessfulLanding(Boolean(bool)),
        [successfulLanding, toggleSuccessfulLanding]
    );

    const onClickYear = useCallback(
        (year) => () => (year === selectedYear ? changeYear() : changeYear(year)),

        [changeYear, selectedYear]
    );

    return (
        <div
            style={{
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 10,
                paddingBottom: 40
            }}>
            <p style={{ fontSize: 15, fontWeight: 'bold', marginTop: 0 }}>Filters</p>
            <div
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                <Title>Launch Year</Title>

                <div className={styles.gridRow}>
                    {yearArray.map((year, index) => (
                        <div key={year} className={styles.filterItem}>
                            <div
                                style={{
                                    backgroundColor: selectedYear == year ? '#7cba01' : '#c5e09a'
                                }}
                                tabIndex={index}
                                role="button"
                                onKeyDown={onClickYear(year)}
                                onClick={onClickYear(year)}
                                className={styles.filterButton}>
                                {year}
                            </div>
                        </div>
                    ))}
                </div>

                <Title>Successful Launch</Title>

                <div className={styles.gridRow} style={{ width: '100%' }}>
                    {booleanButtons.map((bool, index) => (
                        <div key={bool} className={styles.filterItem}>
                            <div
                                style={{
                                    backgroundColor:
                                        successfulLaunch == Boolean(bool) ? '#7cba01' : '#c5e09a'
                                }}
                                tabIndex={index}
                                onKeyDown={onClickSuccessfulLaunch(bool)}
                                onClick={onClickSuccessfulLaunch(bool)}
                                role="button"
                                className={styles.filterButton}>
                                {Boolean(bool).toString()}
                            </div>
                        </div>
                    ))}
                </div>
                <Title>Successful Landing</Title>

                <div className={styles.gridRow} style={{ width: '100%' }}>
                    {booleanButtons.map((bool, index) => (
                        <div key={bool} className={styles.filterItem}>
                            <div
                                style={{
                                    backgroundColor:
                                        successfulLanding == Boolean(bool) ? '#7cba01' : '#c5e09a'
                                }}
                                tabIndex={index}
                                onKeyDown={onClickSuccessfulLanding(bool)}
                                onClick={onClickSuccessfulLanding(bool)}
                                role="button"
                                className={styles.filterButton}>
                                {Boolean(bool).toString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

MissionFilter.propTypes = propTypes;

export default MissionFilter;
