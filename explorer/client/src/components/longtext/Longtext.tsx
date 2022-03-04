import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ReactComponent as ContentCopyIcon } from '../../assets/content_copy_black_18dp.svg';
import { navigateWithUnknown } from '../../utils/utility_functions';
import styles from './Longtext.module.css';

function Longtext({
    text,
    category = 'unknown',
    isLink = true,
}: {
    text: string;
    category: 'objects' | 'transactions' | 'addresses' | 'unknown';
    isLink?: boolean;
}) {
    const [isCopyIcon, setCopyIcon] = useState(true);
    const navigate = useNavigate();

    const handleCopyEvent = useCallback(() => {
        navigator.clipboard.writeText(text);
        setCopyIcon(false);
        setTimeout(() => setCopyIcon(true), 1000);
    }, [setCopyIcon, text]);

    let icon;

    if (isCopyIcon) {
        icon = (
            <span className={styles.copy} onClick={handleCopyEvent}>
                <ContentCopyIcon />
            </span>
        );
    } else {
        icon = <span className={styles.copied}>&#10003; Copied</span>;
    }

    let textComponent;

    if (isLink) {
        if (category === 'unknown') {
            textComponent = (
                <span
                    className={styles.longtext}
                    onClick={() => navigateWithUnknown(text, navigate)}
                >
                    {text}
                </span>
            );
        } else {
            textComponent = (
                <Link className={styles.longtext} to={`/${category}/${text}`}>
                    {text}
                </Link>
            );
        }
    } else {
        textComponent = <span>{text}</span>;
    }

    return (
        <>
            {textComponent}&nbsp;{icon}
        </>
    );
}

export default Longtext;
