
    declare type ForgotPasswordContextType = {
      currentStep: number;
      userEmail :EmailForm ;
      setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
      handlNextStep: () => void;
      handlPreStep: () => void;
      getUserEamil: (userEmail: EmailForm ) => void;
    };