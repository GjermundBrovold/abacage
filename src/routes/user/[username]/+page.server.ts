import type { playerInterface } from '../../player';
import { getPlayerSnapshot } from '../../../firebase/databaseHelpers';

interface slug {username: string};

export async function load({params}: any): Promise<playerInterface> {
        return getPlayerSnapshot(params.username)
}
