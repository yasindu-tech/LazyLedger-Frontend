// Minimal ambient declarations to avoid TypeScript failures when @types packages
// for React and other libs are not installed in the environment.
// This file is a temporary convenience. For a robust solution, install proper
// type packages (e.g., @types/react) and remove/replace these declarations.

declare namespace React {
  // Minimal types used by the codebase
  type ComponentProps<T = any> = any
  type ComponentPropsWithoutRef<T = any> = any
  type ComponentPropsWithRef<T = any> = any
  type JSXElementConstructor<P = any> = (props: P) => any
  function createElement(...args: any[]): any
  interface Attributes {}
}

declare module 'react' {
  export = React
}

declare module 'react/jsx-runtime' {
  export function jsx(...args: any[]): any
  export function jsxs(...args: any[]): any
  export function jsxDEV(...args: any[]): any
}

declare module 'framer-motion'
declare module 'recharts'
declare module 'lucide-react'
declare module 'react-router'
declare module '@clerk/clerk-react'

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
