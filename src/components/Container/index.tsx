import styles from './container.module.css'

interface ContainerProps {
    children: React.ReactNode
}

export const Container = ({ children }: ContainerProps) => {
    return <main className={styles.container}>{children}</main>
}
