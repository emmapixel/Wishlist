type PrimaryButtonProps = React.ComponentProps<'button'> & {
    title: string;
  };

export const PrimaryButton = (props: PrimaryButtonProps) => {
    const { title } = props;
    return (
        <button className="flex font-medium bg-blue-400 rounded-full px-4 py-2" {...props}>{title}</button>
    )
}