import { SearchInput } from '@/components/SearchInput'
import { IconBell, IconCamera } from '@/components/Icons'
import Image from 'next/image'
import logo from './logo.png'
import avatar from './avatar.png'
import styles from './header.module.css'

export const Header = () => {
    return (
        <header className={styles.header}>
            <Image src={logo} alt="" />
            <form className={styles.form}>
                <SearchInput />
            </form>
            <ul className={styles.actions}>
                <li>
                    <IconBell />
                </li>
                <li>
                    <IconCamera />
                </li>
                <li>
                    <Image src={avatar} alt="" />
                </li>
            </ul>
        </header>
    )
}
