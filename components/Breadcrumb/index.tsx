import Icon from '@comps/Icon'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Breadcrumb = () => {
  const router = useRouter()

  const getCrumbs = (path: string) => {
    if (path === '/') return [{ route: '/', label: 'home' }]
    const pathWithoutOptionalParams = path.split('?')[0]
    const pathItems = pathWithoutOptionalParams.split('/')
    return pathItems.reduce((prev: any, curr: any, i: number, arr: any[]) => {
      if (curr === '') return [...prev, { route: '/', label: 'home' }]
      const accumulatedRoute = arr.slice(0, i + 1).join('/')
      return [...prev, { route: accumulatedRoute, label: curr }]
    }, [])
  }

  const crumbs = getCrumbs(router.asPath)

  return (
    <div className="">
      <div className="text-sm breadcrumbs">
        <ul>
          {crumbs.map((crumb) => (
            <Crumb
              href={crumb?.route}
              label={crumb?.label}
              key={crumb?.route}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

const Crumb = ({ label, href = '/' }: { label: string; href: string }) => {
  return (
    <li>
      <Link href={href}>
        <a className="max-w-[80px] truncate ">
          {label === 'home' ? <Icon name="home" /> : label}
        </a>
      </Link>
    </li>
  )
}

export default Breadcrumb
