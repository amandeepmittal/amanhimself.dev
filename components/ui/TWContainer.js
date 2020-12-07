import classNames from 'classnames';

const TWContainer = ({ as = 'div', className = '', children, noMargin }) => {
  const Element = { as };

  return (
    <Element.as
      className={classNames(
        'container max-w-3xl mx-auto xl:max-w-5xl',
        { 'px-4 xl:px-0': !noMargin },
        className
      )}>
      {children}
    </Element.as>
  );
};

export default TWContainer;
