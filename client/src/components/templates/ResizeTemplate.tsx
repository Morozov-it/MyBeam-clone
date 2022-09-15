import React from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'

interface Props<T> {
    mainSection: React.ReactNode
    viewSection: React.ReactNode
    selectedItem: T | null
    width: number
}

const ResizeTemplate = <T,>({ mainSection, viewSection, selectedItem, width }: Props<T>) => {
    const full = width > 940
    const collapsed = width < 940
    return (
        <ReflexContainer orientation="vertical" windowResizeAware style={{ display: full ? 'flex' : 'block' }}>
            {!(!!selectedItem && collapsed) && <ReflexElement className="left-pane" minSize={385}>
                {mainSection}
            </ReflexElement>}
            {!!selectedItem && full && <ReflexSplitter style={{ margin: '0 8px' }} />}
            {!!selectedItem && <ReflexElement className="right-pane" minSize={410} size={600} >
                {viewSection}
            </ReflexElement>}
        </ReflexContainer>
    )
}

export default React.memo(ResizeTemplate) as typeof ResizeTemplate