interface ContainerProps {
  children: React.ReactNode;
  title: string;
  path: string;
}

const Container = ({ children, title, path }: ContainerProps) => {
  return <div className="flex-1 px-4 sm:px-6 lg:px-8 py-4 overflow-y-auto">
    <p className="text-sm color-text-secondary">{path}</p>
    <h1 className="text-2xl color-text-primary mb-4">{title}</h1>    
    {children}
    </div>;
};

export default Container;
