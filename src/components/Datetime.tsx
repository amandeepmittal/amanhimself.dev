import { LOCALE } from '@config';

interface DatetimesProps {
  pubDatetime: string | Date;
  modDatetime: string | Date | undefined | null;
}

interface Props extends DatetimesProps {
  size?: 'xs' | 'sm' | 'lg';
  className?: string;
}

export default function Datetime({
  pubDatetime,
  modDatetime,
  size = 'sm',
  className
}: Props) {
  if (!pubDatetime) {
    console.warn(
      'Datetime component received invalid pubDatetime:',
      pubDatetime
    );
    return null;
  }

  const textSizeClass =
    size === 'lg' ? 'text-base' : size === 'xs' ? 'text-xs' : 'text-sm';
  const iconScaleClass =
    size === 'lg' ? 'scale-100' : size === 'xs' ? 'scale-75' : 'scale-90';

  return (
    <div className={`flex items-center space-x-2 opacity-80 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconScaleClass} inline-block h-6 w-6 min-w-[1.375rem] fill-skin-base`}
        aria-hidden="true"
      >
        <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
        <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
      </svg>
      {modDatetime && modDatetime > pubDatetime ? (
        <span className={`italic ${textSizeClass}`}>
          Updated:
        </span>
      ) : (
        <span className="sr-only">Published:</span>
      )}
      <span className={`italic ${textSizeClass}`}>
        <FormattedDatetime
          pubDatetime={pubDatetime}
          modDatetime={modDatetime}
        />
      </span>
    </div>
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
