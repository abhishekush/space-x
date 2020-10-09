import PropTypes from 'prop-types';
import InfoText from './InfoText';
import styles from '../../styles/Home.module.css';

const propTypes = {
    image: PropTypes.string.isRequired,
    missionId: PropTypes.array.isRequired,
    missionName: PropTypes.string.isRequired,
    flightNumber: PropTypes.number.isRequired,
    launchYear: PropTypes.string.isRequired,
    successfulLaunch: PropTypes.bool.isRequired,
    successfulLanding: PropTypes.bool.isRequired
};

const MissionInfo = (props) => {
    return (
        <div className={styles.gridItem} style={{ padding: 7 }}>
            <div style={{ backgroundColor: '#fff', padding: 12, borderRadius: 10 }}>
                <div
                    style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        borderRadius: 10
                        // paddingRight: 12
                    }}>
                    <div
                        style={{
                            display: 'flex',
                            // flex: 1,
                            backgroundColor: '#f7f7f7',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <img src={props.image} alt="Mission logo" className={styles.missionImg} />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'column'
                        }}>
                        <h5
                            className={
                                styles.infoTitle
                            }>{`${props.missionName}#${props.flightNumber}`}</h5>
                        <InfoText label={'Mission Ids'} value={props.missionId} />
                        <InfoText label={'Launch Year'} value={props.launchYear} />
                        <InfoText
                            label={'Successful Launch'}
                            value={(props.successfulLaunch ?? '').toString()}
                        />
                        <InfoText
                            label={'Successful Landing'}
                            value={(props.successfulLanding ?? '').toString()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

MissionInfo.propTypes = propTypes;

export default MissionInfo;
