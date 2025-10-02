import {Component} from 'react'

class ErrorBoundary extends Component {
    constructor(p) {
        super(p)
        this.state = {err: null}
    }

    static getDerivedStateFromError(e) {
        return {err: e}
    }

    componentDidCatch() {
    }

    render() {
        if (this.state.err) {
            return this.props.fallback || ("An unexpected error occurred")
        }
        return this.props.children
    }
}

export default ErrorBoundary
