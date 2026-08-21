import style from './Container.module.css';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode; 
}

export const Container = ({ children, className = '', ...props }: ContainerProps) =>  (
        <div 
            className={`${style["container"]} ${className}`.trim()} 
            {...props} 
        >
          {children}
        </div>
);
