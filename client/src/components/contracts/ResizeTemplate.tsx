import React from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'

interface Props {
    mainSection: React.ReactNode
    viewSection: React.ReactNode
    selectedItem: any
    width: number
}

const ResizeTemplate: React.FC<Props> = ({ mainSection, viewSection, selectedItem, width }) => {
    return (
        <ReflexContainer orientation="vertical" windowResizeAware style={{ display: width > 750 ? 'flex' : 'block' }}>
            {!(!!selectedItem && width < 750) && <ReflexElement className="left-pane" minSize={385}>
                {mainSection}
            </ReflexElement>}
            {!!selectedItem && width > 750 && <ReflexSplitter style={{ margin: '0 8px' }} />}
            {!!selectedItem && <ReflexElement className="right-pane" minSize={410} size={600} >
                {viewSection}
            </ReflexElement>}
        </ReflexContainer>
    )
}

export default React.memo(ResizeTemplate)