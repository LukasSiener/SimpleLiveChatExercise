import {TYPE_ENUM} from "./TYPE_ENUM";

export interface IMessage{
    type: TYPE_ENUM;

    content: string;

    from?: string;

    to?: string;

    token?: string;
}