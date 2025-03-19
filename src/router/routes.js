import { RouteNamesEnum } from '@/router/router.types.js'

const FormPage = () => import('@/pages/FormPage.vue')
const DataPage = () => import('@/pages/DataPage.vue')

export default [
    {
        path: '/',
        name: RouteNamesEnum.form,
        component: FormPage,
    },
    {
        path: '/data',
        name: RouteNamesEnum.data,
        component: DataPage,
    },
]
