import { LOCALE } from '@config';

interface DatetimesProps {
  pubDatetime: string | Date;
  modDatetime: string | Date | undefined | null;
}

interface Props extends DatetimesProps {
  className?: string;
}

export default function Datetime({
  pubDatetime,
  modDatetime,
  className
}: Props) {
  if (!pubDatetime) {
    console.warn(
      'Datetime component received invalid pubDatetime:',
      pubDatetime
    );
    return null;
  }

  const isUpdated = Boolean(modDatetime && modDatetime > pubDatetime);

  return (
    <span
      className={`whitespace-nowrap font-mono text-xs tabular-nums text-skin-base opacity-50 ${className ?? ''}`}
    >
      {isUpdated ? (
        <span className="mr-1">Updated:</span>
      ) : (
        <span className="sr-only">Published:</span>
      )}
      <FormattedDatetime
        pubDatetime={pubDatetime}
        modDatetime={modDatetime}
      />
    </span>
  );
}

const FormattedDatetime = ({ pubDatetime, modDatetime }: DatetimesProps) => {
  if (!pubDatetime) {
    return <time>Invalid date</time>;
  }

  try {
    const myDatetime = new Date(
      modDatetime && modDatetime > pubDatetime ? modDatetime : pubDatetime
    );

    if (isNaN(myDatetime.getTime())) {
      console.warn('Invalid date provided to FormattedDatetime:', {
        pubDatetime,
        modDatetime
      });
      return <time>Invalid date</time>;
    }

    const date = myDatetime.toLocaleDateString(LOCALE.langTag, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    return (
      <>
        <time dateTime={myDatetime.toISOString()}>{date}</time>
        {/* <span className="sr-only">&nbsp;at&nbsp;</span> */}
        {/* <span className="text-nowrap">{time}</span> */}
      </>
    );
  } catch (error) {
    console.error('Error formatting datetime:', error);
    return <time>Invalid date</time>;
  }
};
