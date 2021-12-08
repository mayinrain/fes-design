import { withInstall, withNoopInstall } from '../_util/withInstall';
import Table from './table';
import Column from './column';

export const FTable = withInstall(Table, { Column });
export const FColumn = withNoopInstall(Column);

export default FTable;
