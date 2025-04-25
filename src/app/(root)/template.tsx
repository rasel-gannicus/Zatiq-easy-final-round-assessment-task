
const template = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[90vh]">
                {children}
            </div>
        </div>
    );
};

export default template;
