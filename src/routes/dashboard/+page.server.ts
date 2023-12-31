import type { sessionInterfaceDB } from '../sessionInterface'
import { getSessionSnapshot } from '../../firebase/sessions';

export async function load(): Promise<sessionInterfaceDB> {
    return getSessionSnapshot()
}
