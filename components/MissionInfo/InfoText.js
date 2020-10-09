import PropTypes from 'prop-types';
import styles from '../../styles/Home.module.css';

const propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired
};

const InfoText = (props) => (
    <span>
        <span>
            {props.label}:{' '}
            {Array.isArray(props.value) ? (
                renderList(props.value)
            ) : (
                <span className={styles.infoValue}>{props.value}</span>
            )}
        </span>
    </span>
);

function renderList(arr) {
    if (arr.length) {
        return (
            <ul>
                {arr.map((data, index) => (
                    <li key={index}>{data}</li>
                ))}
            </ul>
        );
    }
    return null;
}

InfoText.propTypes = propTypes;

export default InfoText;
