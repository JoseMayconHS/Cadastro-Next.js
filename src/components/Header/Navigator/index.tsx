import Link from 'next/link'

import * as styles from './styles'

interface INavigator {
  label: string, link: string
}

export default function Navigator({
  label, link
}: INavigator) {
  return (
    <li>
      <Link href={ link } passHref>
        { label }
      </Link>
    </li>
  )
}

