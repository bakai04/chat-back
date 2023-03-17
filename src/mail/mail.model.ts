import * as moment from 'moment';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

const generateOneMinuteLater = ()=>{
  const now = moment();
  const expiresAt = now.add(1, "minutes");
  return expiresAt.format("YYYY-MM-DDTHH:mm:ssZ");
}

interface MailCreationAttrs{
  email: string,
  passowrd: string,
  code: string,
}

@Table({ tableName: 'mail' })
export class Mail extends Model<Mail, MailCreationAttrs> {
  @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({type:DataType.STRING, unique: true, allowNull: true })
  email: string;

  @Column({type:DataType.STRING, allowNull: true})
  code: string;

  @Column({type: DataType.DATE, allowNull: false, defaultValue: generateOneMinuteLater()})
  expiresAt: Date;
}
